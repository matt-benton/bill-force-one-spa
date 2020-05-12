<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    protected $fillable = ['id', 'name', 'description', 'amount', 'due_date', 'due_month', 'autopay', 'paid'];

    public function account()
    {
        return $this->belongsTo('App/Account');
    }
}
