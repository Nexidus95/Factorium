<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
	protected $user;
	
	public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }
	
    public function index()
    {
        return $this->user
            ->products()
            ->get();
    }
 
    public function show($id)
    {
        $product = $this->user->products()->find($id);
    
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, product not found.'
            ], 400);
        }
    
        return $product;
    }
    public function store(Request $request)
    {
		$data = $request->only('name', 'lenght', 'height', 'width', 'type','status','orders');
		$validator = Validator::make($data, [
			'name'=> 'required|string',
			'lenght'=> 'required',
			'height'=> 'required',
			'width'=> 'required',
			'type'=> 'required|string',
			'status'=> 'required|string',
			'orders'=> 'required'
		]);	
		
		if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 401);
        }
		
		$product = $this->user->products()->create([
            'name' => $request->name,
            'lenght' => $request->lenght,
            'height' => $request->width,
			'width' => $request->width,
            'type' => $request->type,
			'status' => $request->status,
			'orders' => $request->orders
        ]);
		
		
        return response()->json([
			'success' => true,
            'message' => 'Product created successfully',
            'data' => $product
        ], 201);
    }

    public function update(Request $request, Product $product)
    {
        //Validate data
        $data = $request->only('name', 'lenght', 'height', 'width', 'type','status','orders');
		$validator = Validator::make($data, [
			'name'=> 'required|string',
			'lenght'=> 'required',
			'height'=> 'required',
			'width'=> 'required',
			'type'=> 'required|string',
			'status'=> 'required|string',
			'orders'=> 'required'
		]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 401);
        }

        //Request is valid, update product
        $product = $product->update([
            'name' => $request->name,
            'lenght' => $request->lenght,
            'height' => $request->width,
			'width' => $request->width,
            'type' => $request->type,
			'status' => $request->status,
			'orders' => $request->orders
        ]);

        //Product updated, return success response
        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
            'data' => $product
        ], 200);
    }

    public function delete(Product $product)
    {
        $product->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully'
        ], 204);
    }

}
