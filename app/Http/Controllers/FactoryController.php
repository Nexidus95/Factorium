<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Factory;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class FactoryController extends Controller
{
	protected $user;
	
	public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }
	
    public function index()
    {
        return $this->user
            ->factories()
            ->get();
    }
 
    public function show($id)
    {
        $factory = $this->user->factories()->find($id);
    
        if (!$factory) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, product not found.'
            ], 400);
        }
    
        return $factory;
    }
    public function store(Request $request)
    {
		$data = $request->only('company', 'city', 'adress', 'workerCount', 'status');
		$validator = Validator::make($data, [
			'company'=> 'required|string',
			'adress'=> 'required|string',
			'city'=> 'required|string',
			'workerCount'=> 'required',
			'status'=> 'required'
		]);	
		
		if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 401);
        }
		
		$factory = $this->user->factories()->create([
            'company' => $request->company,
            'city' => $request->city,
            'adress' => $request->adress,
			'workerCount' => $request->workerCount,
            'status' => $request->status
        ]);
		
		
        return response()->json([
			'success' => true,
            'message' => 'Factory created successfully',
            'data' => $factory
        ], 201);
    }

    public function update(Request $request, Factory $factory)
    {
        //Validate data
        $data = $request->only('company', 'city', 'adress', 'workerCount', 'status');
        $validator = Validator::make($data, [
			'company'=> 'required|string',
			'adress'=> 'required|string',
			'city'=> 'required|string',
			'workerCount'=> 'required',
			'status'=> 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 401);
        }

        //Request is valid, update product
        $factory = $factory->update([
            'company' => $request->company,
            'city' => $request->city,
            'adress' => $request->adress,
			'workerCount' => $request->workerCount,
            'status' => $request->status
        ]);

        //Product updated, return success response
        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
            'data' => $factory
        ], 200);
    }

    public function delete(Factory $factory)
    {
        $factory->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully'
        ], 204);
    }

}
