<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    protected $fillable = ['id', 'paid'];

    public function account()
    {
        return $this->belongsTo('App/Account');
    }
}
