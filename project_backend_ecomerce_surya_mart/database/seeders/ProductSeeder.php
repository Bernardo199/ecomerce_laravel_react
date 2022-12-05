<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('id_ID');

        for($i = 0; $i <= 20; $i++) {
            Product::create([
                'p_image'   => 'product.jpg',
                'p_kode'    => $faker->ean8(),
                'p_name'    => $faker->word(),
                'p_price'   => $faker->randomNumber(6, true),
                'p_stock'   => $faker->randomNumber(2, true),
                'p_unit'    => 'pcs',
                'category_id' => $faker->randomDigit()
            ]);
        }
        
    }
}
