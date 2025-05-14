'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, PlaneTakeoff, PlaneLanding, Leaf, Timer, AlertTriangle, Moon } from 'lucide-react';

type FlightData = {
  flights: {
    departure_airport: { name: string; id: string; time: string };
    arrival_airport: { name: string; id: string; time: string };
    duration: number;
    airplane: string;
    airline: string;
    airline_logo: string;
    travel_class: string;
    flight_number: string;
    legroom: string;
    extensions: string[];
    often_delayed_by_over_30_min?: boolean;
    overnight?: boolean;
  }[];
  total_duration: number;
  carbon_emissions: {
    this_flight: number;
    typical_for_this_route: number;
    difference_percent: number;
  };
  price: number;
  type: string;
  airline_logo: string;
  departure_token: string;
}[];

export default function FlightOptions({ data }: { data: FlightData }) {
  return (
    <div className="grid gap-6">
      {data.map((flight, idx) => {
        const leg = flight.flights[0];
        return (
          <Card key={idx} className="shadow-md rounded-2xl">
            <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start gap-4">
              {/* Airline and logo */}
              <div className="flex items-center gap-4">
                <img src={leg.airline_logo} alt={leg.airline} className="w-12 h-12 object-contain" />
                <div>
                  <p className="text-lg font-semibold">{leg.airline}</p>
                  <p className="text-sm text-muted-foreground">{leg.flight_number} • {leg.airplane}</p>
                </div>
              </div>

              {/* Timings and airport codes */}
              <div className="flex flex-col items-start md:items-center md:flex-row gap-2">
                <div className="flex items-center gap-2">
                  <PlaneTakeoff className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{new Date(leg.departure_airport.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <p className="text-sm text-muted-foreground">{leg.departure_airport.id}</p>
                  </div>
                </div>
                <span className="text-muted-foreground hidden md:inline mx-2">→</span>
                <div className="flex items-center gap-2">
                  <PlaneLanding className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{new Date(leg.arrival_airport.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <p className="text-sm text-muted-foreground">{leg.arrival_airport.id}</p>
                  </div>
                </div>
              </div>

              {/* Duration & emissions */}
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2 text-sm">
                  <Timer className="w-4 h-4 text-muted-foreground" />
                  {flight.total_duration} min
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Leaf className="w-4 h-4 text-green-600" />
                  {(flight.carbon_emissions.this_flight / 1000).toFixed(0)} kg CO₂
                  <span className="text-xs text-muted-foreground">({flight.carbon_emissions.difference_percent}% less)</span>
                </div>
              </div>

              {/* Legroom and Price */}
              <div className="flex flex-col items-start gap-2">
                <Badge variant="outline" className="text-xs">{leg.legroom}</Badge>
                <p className="text-xl font-semibold text-primary">${flight.price}</p>
              </div>

              {/* Flags */}
              <div className="flex flex-col gap-1">
                {leg.often_delayed_by_over_30_min && (
                  <Badge variant="destructive" className="flex items-center gap-1 text-xs">
                    <AlertTriangle className="w-3 h-3" /> Often Delayed
                  </Badge>
                )}
                {leg.overnight && (
                  <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                    <Moon className="w-3 h-3" /> Overnight Flight
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
