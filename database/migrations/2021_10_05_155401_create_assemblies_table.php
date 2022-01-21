<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssembliesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assemblies', function (Blueprint $table) {
            $table->BigIncrements('id');
			$table->unsignedBigInteger('user_id')->unsigned();
			$table->string('name');
			$table->string('type');
			$table->integer('stage');
			$table->string('status');
			$table->text('comment');
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
        Schema::dropIfExists('assemblies');
    }
}
