import BookingForm from "@/components/booking-form"

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Book Your Appointment</h1>
          <p className="text-gray-500 text-center mb-8">
            Select your preferred date and time to schedule your appointment
          </p>
          <BookingForm />
        </div>
      </div>
    </div>
  )
}
