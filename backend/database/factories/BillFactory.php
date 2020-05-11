<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Bill;
use Faker\Generator as Faker;

$factory->define(Bill::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
        'description' => $faker->sentence,
        'amount' => $faker->numberBetween(100, 10000),
        'due_date' => $faker->numberBetween(1, 30),
        'due_month' => $faker->numberBetween(0, 12),
    ];
});
