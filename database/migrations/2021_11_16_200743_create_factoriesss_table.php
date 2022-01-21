<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFactoriesssTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('factories', function (Blueprint $table) {
            $table->BigIncrements('id');
			$table->unsignedBigInteger('user_id')->unsigned();
			$table->string('company');
			$table->string('city');
			$table->string('adress');
			$table->integer('workerCount');
			$table->string('status');
            $table->timestamps();


			$table->foreign('user_id')
                    ->references('id')
                    ->on('users')
                    ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('factories');
    }
}
