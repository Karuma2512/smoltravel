<?php

namespace Database\Seeders;

use App\Models\VisitorStat;
use Illuminate\Database\Seeder;

class VisitorStatSeeder extends Seeder
{
    public function run(): void
    {
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $visitors = [45000, 52000, 61000, 67000, 71000, 89000, 102000, 110000, 93000, 84000, 73000, 91000];
        
        for ($i = 0; $i < count($months); $i++) {
            VisitorStat::create([
                'month' => $months[$i],
                'visitors' => $visitors[$i],
                'year' => 2023,
            ]);
        }
    }
}