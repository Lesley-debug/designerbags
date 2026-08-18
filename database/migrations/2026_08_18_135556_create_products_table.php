<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('brand')->nullable();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->decimal('base_price', 10, 2);
            $table->decimal('sale_price', 10, 2)->nullable();
            $table->string('status')->default('active'); // draft | active | archived
            $table->boolean('featured')->default(false);
            $table->boolean('new_arrival')->default(false);
            $table->timestamps();

            $table->index(['status', 'featured']);
            $table->index(['status', 'new_arrival']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
