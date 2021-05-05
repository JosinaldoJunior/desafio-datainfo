<?php

namespace TodoList\Http\Controllers\Api;

use Illuminate\Database\Eloquent\Builder;
use TodoList\Http\Controllers\Controller;
use TodoList\Http\Filters\ContactFilter;
use TodoList\Http\Filters\TodoListFilter;
use TodoList\Http\Requests\TodoListRequest;
use TodoList\Http\Resources\ContactResource;
use TodoList\Http\Resources\TodoListResource;
use TodoList\Models\TodoList;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        /** @var TodoListFilter $filter */
        $filter = app(TodoListFilter::class);
        /** @var Builder $filterQuery */
        $filterQuery = TodoList::filtered($filter);
        $todoLists = $filterQuery->get();
        return TodoListResource::collection($todoLists);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param TodoListRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(TodoListRequest $request)
    {
        $todoList = TodoList::create($request->all());
        $todoList->refresh();
        return $todoList;
    }

    /**
     * Display the specified resource.
     *
     * @param  \TodoList\Models\TodoList  $todoList
     * @return \Illuminate\Http\Response
     */
    public function show(TodoList $todoList)
    {
        return new TodoListResource($todoList);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \TodoList\Models\TodoList  $todoList
     * @return \Illuminate\Http\Response
     */
    public function update(TodoListRequest $request, TodoList $todoList)
    {
        $todoList->fill($request->all());
        $todoList->save();

        return $todoList;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \TodoList\Models\TodoList  $todoList
     * @return \Illuminate\Http\Response
     */
    public function destroy(TodoList $todoList)
    {
        $todoList->delete();
        return response()->json([], 204);
    }
}
