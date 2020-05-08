<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $fillable = ['name', 'description'];

    public function bills()
    {
        return $this->hasMany('App\Bill');
    }
}
