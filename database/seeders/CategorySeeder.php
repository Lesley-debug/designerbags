<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $handbags = Category::create(['name' => 'Handbags', 'slug' => 'handbags', 'sort_order' => 1]);
        $watches = Category::create(['name' => 'Watches', 'slug' => 'watches', 'sort_order' => 2]);

        $womens = Category::create(['name' => "Women's Bags", 'slug' => 'womens-bags', 'parent_id' => $handbags->id, 'sort_order' => 1]);
        $mens = Category::create(['name' => "Men's Bags", 'slug' => 'mens-bags', 'parent_id' => $handbags->id, 'sort_order' => 2]);

        foreach (['Tote Bags', 'Shoulder Bags', 'Crossbody Bags', 'Clutches'] as $i => $name) {
            Category::create([
                'name' => $name,
                'slug' => 'women-' . str($name)->slug(),
                'parent_id' => $womens->id,
                'sort_order' => $i + 1,
            ]);
        }

        foreach (['Messenger Bags', 'Sling Bags', 'Backpacks'] as $i => $name) {
            Category::create([
                'name' => $name,
                'slug' => 'men-' . str($name)->slug(),
                'parent_id' => $mens->id,
                'sort_order' => $i + 1,
            ]);
        }

        foreach (["Men's Watches", "Women's Watches"] as $i => $name) {
            Category::create([
                'name' => $name,
                'slug' => str($name)->slug(),
                'parent_id' => $watches->id,
                'sort_order' => $i + 1,
            ]);
        }
    }
}
