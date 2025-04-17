import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface DestinationGalleryProps {
  destination: string
  images: {
    url: string
    alt: string
    photographer?: string
    photographerUrl?: string
  }[]
}

export default function DestinationGallery({ destination, images }: DestinationGalleryProps) {
  return (
    <Card className="w-full max-w-[200px] border-blue-200 dark:border-blue-800 overflow-hidden mt-1">
      <CardContent className="p-1">
        <div className="flex items-center mb-1">
          <MapPin className="h-2 w-2 mr-1 text-blue-500" />
          <h3 className="font-medium text-xs">{destination}</h3>
        </div>

        <div className="flex overflow-x-auto gap-1 pb-1">
          {images.slice(0, 6).map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="relative overflow-hidden rounded-sm cursor-pointer h-10 w-10 flex-shrink-0">
                  <img src={image.url || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 overflow-hidden">
                <div className="relative">
                  <img
                    src={image.url.replace("thumb", "regular") || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full object-contain max-h-[80vh]"
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

