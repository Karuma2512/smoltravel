"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, User, Bot, Plane } from "lucide-react"
import WeatherCard from "@/components/weather-card"
import TravelPackageCard from "@/components/travel-package-card"
import FlightInfoCard from "@/components/flight-info-card"
import AirportInfoCard from "@/components/airport-info-card"
import DestinationGallery from "@/components/destination-gallery"
import FlightSearchResults from "@/components/flight-search-results"

export default function TravelAssistant() {
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    maxSteps: 5, // Allow multiple tool calls in sequence
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      try {
        handleSubmit(e)
        setInputValue("")
      } catch (error) {
        console.error("Error sending message:", error)
        // Display an error message to the user
        alert("Unable to send message. Please try again.")
      }
    }
  }

  return (
    <div className="flex flex-col h-screen min-w-[320px] max-w-4xl mx-auto p-4">
      <header className="flex items-center justify-between mb-4 min-w-[300px]">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Plane className="h-6 w-6 text-primary" />
          Travel Assistant
        </h1>
      </header>

      <Card className="flex-1 mb-4 overflow-hidden min-w-[300px]">
        <ScrollArea className="h-[calc(100vh-180px)] overflow-x-auto">
          <CardContent className="p-4 min-w-[300px]">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center text-muted-foreground">
                <Plane className="h-12 w-12 mb-4 text-primary/50" />
                <h3 className="text-lg font-medium mb-2">Welcome to your Travel Assistant!</h3>
                <p className="max-w-md">
                  Ask me about weather conditions, travel packages, flight status, airport information, or destination
                  images.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => {
                  // Determine if this message has tool invocations
                  const hasToolInvocations = message.parts?.some((part) => part.type === "tool-invocation")

                  return (
                    <div key={message.id} className="flex flex-col min-w-[280px]">
                      <div className={`flex items-start gap-3 ${message.role === "user" ? "justify-end" : ""}`}>
                        <div
                          className={`rounded-full p-2 ${message.role === "user" ? "bg-primary text-primary-foreground order-2" : "bg-muted order-1"}`}
                        >
                          {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>

                        <div
                          className={`rounded-lg p-4 max-w-[80%] overflow-x-auto ${message.role === "user" ? "bg-primary/10 order-1" : "bg-muted/50 order-2"}`}
                        >
                          {message.parts ? (
                            // Render message parts (text and tool invocations)
                            <div className="min-w-fit">
                              {message.parts.map((part, index) => {
                                if (part.type === "text") {
                                  return (
                                    <p key={index} className="whitespace-pre-wrap">
                                      {part.text}
                                    </p>
                                  )
                                } else if (part.type === "tool-invocation") {
                                  const toolInvocation = part.toolInvocation

                                  // Handle weather tool
                                  if (toolInvocation.toolName === "getWeather" && toolInvocation.state === "result") {
                                    return (
                                      <WeatherCard
                                        key={index}
                                        location={toolInvocation.args.location}
                                        weather={toolInvocation.result}
                                      />
                                    )
                                  }

                                  // Handle travel packages tool
                                  if (
                                    toolInvocation.toolName === "getTravelPackages" &&
                                    toolInvocation.state === "result"
                                  ) {
                                    return (
                                      <div key={index} className="space-y-3 mt-2">
                                        <h3 className="text-sm font-medium">
                                          Travel Packages for {toolInvocation.args.destination}
                                        </h3>
                                        <div className="overflow-x-auto pb-2">
                                          <div className="flex gap-3 min-w-fit">
                                            {toolInvocation.result.map((pkg: any, i: number) => (
                                              <div key={i} className="w-[280px] flex-shrink-0">
                                                <TravelPackageCard package={pkg} />
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  }

                                  // Handle airport search tool
                                  if (
                                    toolInvocation.toolName === "searchAirports" &&
                                    toolInvocation.state === "result"
                                  ) {
                                    return (
                                      <div key={index} className="space-y-3 mt-2">
                                        <h3 className="text-sm font-medium">
                                          Airports matching "{toolInvocation.args.query}"
                                        </h3>
                                        <div className="overflow-x-auto pb-2">
                                          <div className="flex flex-col gap-2 min-w-fit">
                                            {toolInvocation.result.map((airport: any, i: number) => (
                                              <AirportInfoCard key={i} airport={airport} />
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  }

                                  // Handle flight status tool
                                  if (
                                    toolInvocation.toolName === "getFlightStatus" &&
                                    toolInvocation.state === "result"
                                  ) {
                                    return (
                                      <div key={index} className="mt-2">
                                        <h3 className="text-sm font-medium mb-2">
                                          Flight Status for {toolInvocation.args.airline}
                                          {toolInvocation.args.flightNumber}
                                        </h3>
                                        <FlightInfoCard flight={toolInvocation.result} />
                                      </div>
                                    )
                                  }

                                  // Handle destination images tool
                                  if (
                                    toolInvocation.toolName === "getDestinationImages" &&
                                    toolInvocation.state === "result"
                                  ) {
                                    return (
                                      <div key={index} className="mt-2">
                                        <DestinationGallery
                                          destination={toolInvocation.result.destination}
                                          images={toolInvocation.result.images}
                                        />
                                      </div>
                                    )
                                  }

                                  // Handle flight search tool
                                  if (
                                    toolInvocation.toolName === "searchFlights" &&
                                    toolInvocation.state === "result"
                                  ) {
                                    return (
                                      <div key={index} className="mt-2">
                                        <h3 className="text-xs font-medium mb-1">
                                          Chuyến bay từ {toolInvocation.result.origin} đến{" "}
                                          {toolInvocation.result.destination}
                                        </h3>
                                        <FlightSearchResults
                                          flights={toolInvocation.result.flights}
                                          origin={toolInvocation.result.origin}
                                          destination={toolInvocation.result.destination}
                                          departureDate={toolInvocation.result.departureDate}
                                          returnDate={toolInvocation.result.returnDate}
                                        />
                                      </div>
                                    )
                                  }

                                  // For other tool states (like 'call')
                                  return (
                                    <div key={index} className="text-sm text-muted-foreground italic">
                                      {toolInvocation.state === "call"
                                        ? `Fetching ${toolInvocation.toolName} data...`
                                        : ""}
                                    </div>
                                  )
                                }
                              })}
                            </div>
                          ) : (
                            // Fallback for simple text messages
                            <p className="whitespace-pre-wrap overflow-x-auto">{message.content}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </CardContent>
        </ScrollArea>
      </Card>

      <form onSubmit={onSubmit} className="flex gap-2 min-w-[300px]">
        <Input
          placeholder="Ask about weather, flights, airports, travel packages, or destination images..."
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
      {isLoading && <div className="text-sm text-muted-foreground text-center mt-2">Sending message...</div>}
    </div>
  )
}

