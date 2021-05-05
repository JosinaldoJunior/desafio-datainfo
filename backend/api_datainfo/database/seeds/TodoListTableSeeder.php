<?php

use Illuminate\Database\Seeder;
use TodoList\Models\TodoList;

class TodoListTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(TodoList::class, 1)
            ->create([
                'name' => 'Tarefas DataInfo',
                'user_id' => 1
            ]);
    }
}
