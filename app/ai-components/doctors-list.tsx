import { MapPin, Phone, Star, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"


interface DoctorProfile {
  title: string
  address: string
  phone: string
  rating: number
  reviews: number
  place_id: string
  operating_hours: {
    [key: string]: string
  }
  service_options: {
    onsite_services: boolean
  }
  thumbnail: string
  position: {
    latitude: number
    longitude: number
  }
}

export function DoctorProfileCard({ doctor }: { doctor: DoctorProfile }) {
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden border shadow-lg ">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/10">
              <img src={doctor.thumbnail || "/placeholder.svg"} alt={doctor.title} className="object-cover" />
            </Avatar>
            <div>
              <CardTitle className="text-xl md:text-2xl">{doctor.title}</CardTitle>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{doctor.rating}</span>
                <span className="mx-1">•</span>
                <span>{doctor.reviews} reviews</span>
              </div>
             {doctor.service_options?.onsite_services && (
  <Badge variant="outline" className="mt-2">
    Onsite Services
  </Badge>
)}

              
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="w-full grid grid-cols-3 rounded-none">
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="hours">Hours</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="p-6 space-y-4">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-sm">{doctor.address}</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <a href={`tel:${doctor.phone}`} className="text-sm hover:underline text-primary">
                {doctor.phone}
              </a>
            </div>
          </TabsContent>

         <TabsContent value="hours" className="p-6">
  <div className="space-y-2">
    <div className="flex items-center gap-2 mb-4">
      <Clock className="h-5 w-5 text-muted-foreground" />
      <h3 className="font-medium">Operating Hours</h3>
    </div>
    <div className="grid gap-2">
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="flex justify-between py-1 border-b border-border/50 last:border-0"
        >
          <span className="capitalize text-sm">{day}</span>
          <span className="text-sm font-medium">
            {doctor.operating_hours?.[day] || "Closed"}
          </span>
        </div>
      ))}
    </div>
  </div>
</TabsContent>


         
        </Tabs>
      </CardContent>
    </Card>
  )
}
