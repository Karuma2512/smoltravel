<?php

namespace Database\Seeders;

use App\Models\Destination;
use Illuminate\Database\Seeder;

class DestinationSeeder extends Seeder
{
    public function run(): void
    {
        $destinations = [
            [
                'name' => 'Bali, Indonesia',
                'description' => 'Beautiful beaches and vibrant culture',
                'image' => '/storage/destinations/bali.jpg',
                'visitors' => 6500000,
            ],
            [
                'name' => 'Paris, France',
                'description' => 'City of lights and romance',
                'image' => '/storage/destinations/paris.jpg',
                'visitors' => 8900000,
            ],
            [
                'name' => 'Tokyo, Japan',
                'description' => 'Blend of traditional and modern',
                'image' => '/storage/destinations/tokyo.jpg',
                'visitors' => 9700000,
            ],
            [
                'name' => 'New York, USA',
                'description' => 'The city that never sleeps',
                'image' => '/storage/destinations/newyork.jpg',
                'visitors' => 13100000,
            ],
        ];

        foreach ($destinations as $destination) {
            Destination::create($destination);
        }
    }
}