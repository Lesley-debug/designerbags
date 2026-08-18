<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $tote = Category::where('slug', 'women-tote-bags')->first();
        $sling = Category::where('slug', 'men-sling-bags')->first();
        $mensWatches = Category::where('slug', "mens-watches")->first();

        $p1 = Product::create([
            'category_id' => $tote->id,
            'brand' => 'Signature',
            'name' => 'Classic Leather Tote',
            'slug' => 'classic-leather-tote',
            'description' => 'A spacious, structured tote in full-grain leather — built for daily carry.',
            'base_price' => 45000,
            'sale_price' => 39000,
            'status' => 'active',
            'featured' => true,
            'new_arrival' => true,
        ]);
        $p1->variants()->create(['color' => 'Black', 'sku' => 'TOTE-BLK-01', 'stock_quantity' => 12]);
        $p1->variants()->create(['color' => 'Tan', 'sku' => 'TOTE-TAN-01', 'stock_quantity' => 8]);
        $p1->images()->create(['path' => 'https://images.unsplash.com/photo-1584917865442-de89df76afd3', 'is_primary' => true]);

        $p2 = Product::create([
            'category_id' => $sling->id,
            'brand' => 'Urban Edge',
            'name' => "Men's Canvas Sling Bag",
            'slug' => 'mens-canvas-sling-bag',
            'description' => 'Lightweight water-resistant canvas sling for everyday city carry.',
            'base_price' => 22000,
            'status' => 'active',
            'featured' => true,
            'new_arrival' => false,
        ]);
        $p2->variants()->create(['color' => 'Olive', 'sku' => 'SLING-OLV-01', 'stock_quantity' => 20]);
        $p2->images()->create(['path' => 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3', 'is_primary' => true]);

        $p3 = Product::create([
            'category_id' => $mensWatches->id,
            'brand' => 'Chrono',
            'name' => 'Classic Steel Chronograph',
            'slug' => 'classic-steel-chronograph',
            'description' => 'Stainless steel chronograph watch with sapphire crystal glass.',
            'base_price' => 85000,
            'status' => 'active',
            'featured' => false,
            'new_arrival' => true,
        ]);
        $p3->variants()->create(['color' => 'Silver', 'size' => '42mm', 'sku' => 'WATCH-SLV-42', 'stock_quantity' => 5]);
        $p3->images()->create(['path' => 'https://images.unsplash.com/photo-1524805444758-089113d48a6d', 'is_primary' => true]);
    }
}
