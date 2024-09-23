import { connectionStr } from "@/lib/db";
import { Job } from "@/lib/modals/jobSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await mongoose.connect(connectionStr);

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1; 
        const limit = 5; 
        const skip = (page - 1) * limit; 

        const data = await Job.find().skip(skip).limit(limit);
        const totalJobs = await Job.countDocuments(); 
        const totalPages = Math.ceil(totalJobs / limit);

        return NextResponse.json({
            result: data,
            pagination: {
                currentPage: page,
                totalPages,
                totalJobs
            }
        });
    } catch (error) {
        console.error("Error fetching job data:", error);
        return NextResponse.json({
            result: false,
            message: "An error occurred while fetching job data",
            error: error.message
        }, { status: 500 });
    }
}
