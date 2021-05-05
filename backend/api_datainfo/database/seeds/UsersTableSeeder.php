<?php

use Illuminate\Database\Seeder;
use TodoList\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class, 1)
            ->create([
                'name' => 'Developer Master',
                'email' => 'admin@datainfo.com.br'
            ]);
        factory(User::class, 5)->create();
    }
}
