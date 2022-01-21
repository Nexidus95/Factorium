<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Assembly;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class AssemblyController extends Controller
{
	protected $user;
	
	public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }
	
    public function index()
    {
        return $this->user
            ->assemblies()
            ->get();
    }
 
    public function show($id)
    {
        $assembly = $this->user->assemblies()->find($id);
    
        if (!$assembly) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, product not found.'
            ], 400);
        }
    
        return $assembly;
    }
    public function store(Request $request)
    {
		$data = $request->only('name', 'type', 'stage', 'status', 'comment');
		$validator = Validator::make($data, [
			'name'=> 'required|string',
			'stage'=> 'required|string',
			'type'=> 'required|string',
			'status'=> 'required',
			'comment'=> 'required'
		]);	
		
		if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 401);
        }
		
		$assembly = $this->user->assemblies()->create([
            'name' => $request->name,
            'type' => $request->type,
            'stage' => $request->stage,
			'comment' => $request->comment,
            'status' => $request->status
        ]);
		
		
        return response()->json([
			'success' => true,
            'message' => 'Assembly created successfully',
            'data' => $assembly
        ], 201);
    }

    public function update(Request $request, Assembly $assembly)
    {
        //Validate data
        $data = $request->only('name', 'type', 'stage', 'status', 'comment');
        $validator = Validator::make($data, [
			'name'=> 'required|string',
			'stage'=> 'required',
			'type'=> 'required|string',
			'status'=> 'required|string',
			'comment'=> 'required|string'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 401);
        }

        //Request is valid, update product
        $assembly = $assembly->update([
            'name' => $request->name,
            'type' => $request->type,
            'stage' => $request->stage,
			'status' => $request->status,
			'comment' => $request->comment
        ]);

        //Product updated, return success response
        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
            'data' => $assembly
        ], 200);
    }

    public function delete(Assembly $assembly)
    {
        $assembly->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully'
        ], 204);
    }

}