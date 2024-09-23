import mongoose from "mongoose";

const jobModel = new mongoose.Schema({
  companyName: String,
  position: String,
  location: String,
  workLocation: String,
  aboutRole: String,
  jobType: String,
  employmentType: String,
  department: String,
  aboutCompany: String,
  jobQualification: [
    {
      type: String,
    },
  ],
  jobResponsibility: [
    {
      type: String,
    },
  ],
  skills: [
    {
      type: String,
    },
  ],
  datePosted: { type: Date, default: Date.now },
});

export const Job = mongoose.models.jobs || mongoose.model("jobs", jobModel);
