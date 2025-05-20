"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Car,
  Clock,
  Coffee,
  ExternalLink,
  MapPin,
  Navigation,
  Star,
  Utensils,
  Wifi,
  Dumbbell,
  Waves,
  Wine,
  Bed,
  Sparkles,
  Users,
  Building,
  Heart,
} from "lucide-react"

interface Transportation {
  type: string
  duration: string
}

interface NearbyPlace {
  name: string
  transportations: Transportation[]
}

interface Rating {
  stars: number
  count: number
}

interface ReviewBreakdown {
  name: string
  description: string
  total_mentioned: number
  positive: number
  negative: number
  neutral: number
}

interface RateInfo {
  lowest: string
  extracted_lowest: number
  before_taxes_fees: string
  extracted_before_taxes_fees: number
}

interface ImageInfo {
  thumbnail: string
  original_image: string
}

interface HotelProperty {
  type: string
  name: string
  description: string
  link: string
  property_token: string
  serpapi_property_details_link: string
  gps_coordinates: {
    latitude: number
    longitude: number
  }
  check_in_time: string
  check_out_time: string
  rate_per_night: RateInfo
  total_rate: RateInfo
  nearby_places: NearbyPlace[]
  hotel_class?: string
  extracted_hotel_class?: number
  images?: ImageInfo[]
  overall_rating?: number
  reviews?: number
  ratings?: Rating[]
  location_rating?: number
  reviews_breakdown?: ReviewBreakdown[]
  amenities?: string[]
}

interface HotelPropertyCardProps {
  property: HotelProperty
}

export default function HotelPropertyCard({ property }: HotelPropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = property.images || []

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "free wi-fi":
        return <Wifi className="w-4 h-4" />
      case "free breakfast":
        return <Coffee className="w-4 h-4" />
      case "fitness centre":
        return <Dumbbell className="w-4 h-4" />
      case "outdoor pool":
        return <Waves className="w-4 h-4" />
      case "bar":
        return <Wine className="w-4 h-4" />
      case "restaurant":
        return <Utensils className="w-4 h-4" />
      default:
        return <Sparkles className="w-4 h-4" />
    }
  }

  const getTransportationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "walking":
        return <Users className="w-4 h-4" />
      case "taxi":
        return <Car className="w-4 h-4" />
      case "public transport":
        return <Building className="w-4 h-4" />
      default:
        return <Navigation className="w-4 h-4" />
    }
  }

  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }
  }

  return (
    <Card className="w-full max-w-4xl overflow-hidden border shadow-lg transition-all hover:shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-1 h-[250px] md:h-full">
          {images.length > 0 ? (
            <>
              <Image
                src={images[currentImageIndex]?.thumbnail || "/placeholder.svg?height=400&width=300"}
                alt={property.name}
                fill
                className="object-cover"
              />
              {images.length > 1 && (
                <div className="absolute bottom-2 right-2 flex gap-1">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                    onClick={prevImage}
                  >
                    &lt;
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                    onClick={nextImage}
                  >
                    &gt;
                  </Button>
                </div>
              )}
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                  {property.hotel_class || "Hotel"}
                </Badge>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <Bed className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="md:col-span-2 p-4 md:p-6">
          <div className="flex flex-col h-full">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl md:text-2xl line-clamp-2">{property.name}</CardTitle>
                  {property.overall_rating && (
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(property.overall_rating || 0)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                      <span className="text-sm font-medium ml-1">{property.overall_rating}</span>
                      {property.reviews && (
                        <span className="text-xs text-muted-foreground">({property.reviews} reviews)</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{property.rate_per_night.lowest}</div>
                  <div className="text-xs text-muted-foreground">per night</div>
                </div>
              </div>

              <CardDescription className="mt-2 line-clamp-2">{property.description}</CardDescription>

              <div className="flex flex-wrap gap-2 mt-3">
                <div className="flex items-center text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Check-in: {property.check_in_time}</span>
                </div>
                <div className="flex items-center text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Check-out: {property.check_out_time}</span>
                </div>
                <div className="flex items-center text-xs">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>
                    {property.gps_coordinates.latitude.toFixed(2)}, {property.gps_coordinates.longitude.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="amenities" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="nearby">Nearby</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="amenities" className="h-[120px] overflow-y-auto">
                {property.amenities && property.amenities.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {property.amenities.slice(0, 8).map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground py-4 text-center">
                    No amenities information available
                  </div>
                )}
              </TabsContent>
              <TabsContent value="nearby" className="h-[120px] overflow-y-auto">
                {property.nearby_places && property.nearby_places.length > 0 ? (
                  <div className="space-y-2 mt-2">
                    {property.nearby_places.map((place, index) => (
                      <div key={index} className="text-sm">
                        <div className="font-medium">{place.name}</div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {place.transportations.map((transport, tIndex) => (
                            <Badge key={tIndex} variant="outline" className="flex items-center gap-1 text-xs">
                              {getTransportationIcon(transport.type)}
                              <span>
                                {transport.type}: {transport.duration}
                              </span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground py-4 text-center">
                    No nearby places information available
                  </div>
                )}
              </TabsContent>
              <TabsContent value="reviews" className="h-[120px] overflow-y-auto">
                {property.reviews_breakdown && property.reviews_breakdown.length > 0 ? (
                  <div className="space-y-3 mt-2">
                    {property.reviews_breakdown.slice(0, 3).map((review, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{review.name}</span>
                          <span className="text-xs text-muted-foreground">{review.total_mentioned} mentions</span>
                        </div>
                        <Progress value={(review.positive / review.total_mentioned) * 100} className="h-2" />
                        <div className="flex justify-between text-xs mt-1">
                          <span className="text-green-500">{review.positive} positive</span>
                          <span className="text-red-500">{review.negative} negative</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground py-4 text-center">No review breakdown available</div>
                )}
              </TabsContent>
            </Tabs>

            <div className="mt-auto pt-4">
              <Separator className="mb-4" />
              <div className="flex gap-2">
                <Button className="flex-1">Book Now</Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" asChild>
                 
                    
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
