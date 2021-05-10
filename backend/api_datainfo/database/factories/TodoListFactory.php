<?php

use Faker\Generator as Faker;

$factory->define(TodoList\Models\TodoList::class, function (Faker $faker) {
    return [
        'name' => $faker->colorName,
        'user' => 1,
        'completed' => random_int(0,1),
    ];
});
