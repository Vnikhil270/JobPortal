import { connectionStr } from "@/lib/db";
import { Job } from "@/lib/modals/jobSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Connect to the database
async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(connectionStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
}

export async function POST(request) {
    try {
        // Connect to MongoDB
        await connectDB();

        const body = await request.json();
        const savedJob = await Job.create(body);

        return NextResponse.json({ result: true, data: savedJob }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ result: false, error: error.message }, { status: 500 });
    }
}
