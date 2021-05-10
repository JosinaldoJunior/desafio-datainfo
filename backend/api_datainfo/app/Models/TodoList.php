<?php

namespace TodoList\Models;

use Illuminate\Database\Eloquent\Model;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class TodoList extends Model
{
    use Filterable;
    protected $fillable = ['name', 'user_id', 'completed'];
}
