<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assembly extends Model
{
    protected $fillable = ['name', 'type', 'stage', 'status', 'comment'];
}
