<?php

namespace TodoList\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class TodoListFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search', 'userId'];

    protected $simpleSorts = ['id', 'name', 'created_at'];

    protected function applySearch($value)
    {
        $this->query->where('name', 'LIKE', "%$value%")
                    /*->orWhere('email', 'LIKE', "%$value%")*/;
    }

    protected function applyUserId($value)
    {
        $this->query->where('user_id', '=', $value);
    }
}
