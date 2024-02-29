// // 1. Set Up MongoDB Connection
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/clgTest", {
//   //   useNewUrlParser: true,
//   //   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// // 2. Define Schema
// const { Schema } = mongoose;

// const studentSchema = new Schema({
//   prn: { type: Number, required: true },
//   name: { type: String, required: true },
//   year: { type: String, required: true },
//   branch: { type: String, required: true },
//   category: { type: String, required: true },
//   scholarships: [String],
//   actualfee: { type: Number },
//   totalfee: { type: Number },
//   remaining: { type: Number },
// });

// const Student = mongoose.model("Student", studentSchema);

// // 3. Create Express Routes
// const express = require("express");
// const app = express();
// const port = 7000;

// app.use(express.json());

// // 4. Implement CRUD Operations
// app.get("/", async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.json(students);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// app.post("/", async (req, res) => {
//   try {
//     const { name, category, scholarships } = req.body;

//     // Calculate total fee based on category and scholarship
//     let totalfee = 70000; // Initial fee

//     // Calculate category discount
//     let categoryDiscount = 0;
//     switch (category) {
//       case "obc":
//         categoryDiscount = 40000;
//         break;
//       case "sc":
//         categoryDiscount = 45000;
//         break;
//       case "nt":
//         categoryDiscount = 47000;
//         break;
//       default:
//         break;
//     }

//     // Calculate scholarship discount
//     let scholarshipDiscount = 0;
//     for (let scholarship of scholarships) {
//       switch (scholarship) {
//         case "ebc":
//           scholarshipDiscount += 35000;
//           break;
//         case "obc1":
//           scholarshipDiscount += 10000;
//           break;
//         case "obc2":
//           scholarshipDiscount += 12000;
//           break;
//         case "sc1":
//           scholarshipDiscount += 3000;
//           break;
//         case "sc2":
//           scholarshipDiscount += 5000;
//           break;
//         case "nt1":
//           scholarshipDiscount += 2000;
//           break;
//         case "nt2":
//           scholarshipDiscount += 2500;
//           break;
//         default:
//           break;
//       }
//     }

//     // Update total fee
//     totalfee -= categoryDiscount;
//     totalfee -= scholarshipDiscount;

//     // Create student object
//     const student = new Student({
//       ...req.body,
//       actualfee: 70000,
//       totalfee,
//       remaining: totalfee,
//     });

//     // Save student to database
//     await student.save();

//     res.status(201).json(student);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// app.get("/:id", async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     res.json(student);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// app.put("/:id", async (req, res) => {
//   try {
//     const { category, scholarships } = req.body;

//     // Find the existing student by ID
//     const student = await Student.findById(req.params.id);
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     // Calculate total fee based on category and scholarships
//     let totalfee = 70000; // Initial fee

//     // Calculate category discount
//     let categoryDiscount = 0;
//     switch (category) {
//       case "obc":
//         categoryDiscount = 40000;
//         break;
//       case "sc":
//         categoryDiscount = 45000;
//         break;
//       case "nt":
//         categoryDiscount = 47000;
//         break;
//       default:
//         break;
//     }

//     // Calculate scholarship discount
//     let scholarshipDiscount = 0;
//     for (let scholarship of scholarships) {
//       switch (scholarship) {
//         case "ebc":
//           scholarshipDiscount += 35000;
//           break;
//         case "obc1":
//           scholarshipDiscount += 10000;
//           break;
//         case "obc2":
//           scholarshipDiscount += 12000;
//           break;
//         case "sc1":
//           scholarshipDiscount += 3000;
//           break;
//         case "sc2":
//           scholarshipDiscount += 5000;
//           break;
//         case "nt1":
//           scholarshipDiscount += 2000;
//           break;
//         case "nt2":
//           scholarshipDiscount += 2500;
//           break;
//         default:
//           break;
//       }
//     }

//     // Update total fee
//     totalfee -= categoryDiscount;
//     totalfee -= scholarshipDiscount;

//     // Update student data with provided information
//     student.set({
//       ...req.body,
//       totalfee,
//       remaining: totalfee,
//     });

//     // Save updated student to the database
//     await student.save();

//     res.json(student);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// app.delete("/:id", async (req, res) => {
//   try {
//     const student = await Student.findByIdAndDelete(req.params.id);
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     res.json({ message: "Student deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // 5. Start Express Server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // Import bodyParser for JSON parsing
const cors = require("cors"); // Import cors module

const app = express();
const port = 7000;

// Middleware
app.use(cors()); // Enable CORS

app.use(express.json());
app.use(bodyParser.json()); // Use bodyParser middleware for JSON parsing

// MongoDB connection

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/clgTest")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define Schema
const studentSchema = new mongoose.Schema({
  prn: { type: Number, required: true, unique: true }, // Set prn field as unique
  name: { type: String, required: true },
  year: { type: String, required: true },
  branch: { type: String, required: true },
  category: { type: String, required: true },
  scholarships: [String],
  actualfee: { type: Number },
  totalfee: { type: Number },
  remaining: { type: Number },
});

// Define Model
const Student = mongoose.model("Student", studentSchema);

// CRUD Operations

app.put("/updateFee/:prn", async (req, res) => {
  try {
    const { newFee } = req.body;

    // Find the student by PRN
    const student = await Student.findOne({ prn: req.params.prn });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Calculate remaining fee after subtracting the new fee
    const remainingFee = student.remaining - newFee;

    // Update the remaining fee in the student object
    student.remaining = remainingFee;

    // Save the updated student to the database
    await student.save();

    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
app.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/", async (req, res) => {
  try {
    const { name, category, scholarships } = req.body;

    // Calculate total fee based on category and scholarship
    let totalfee = 70000; // Initial fee

    // Calculate category discount
    let categoryDiscount = 0;
    switch (category) {
      case "obc":
        categoryDiscount = 40000;
        break;
      case "sc":
        categoryDiscount = 45000;
        break;
      case "nt":
        categoryDiscount = 47000;
        break;
      default:
        break;
    }

    // Calculate scholarship discount
    let scholarshipDiscount = 0;
    for (let scholarship of scholarships) {
      switch (scholarship) {
        case "ebc":
          scholarshipDiscount += 35000;
          break;
        case "obc1":
          scholarshipDiscount += 10000;
          break;
        case "obc2":
          scholarshipDiscount += 12000;
          break;
        case "sc1":
          scholarshipDiscount += 3000;
          break;
        case "sc2":
          scholarshipDiscount += 5000;
          break;
        case "nt1":
          scholarshipDiscount += 2000;
          break;
        case "nt2":
          scholarshipDiscount += 2500;
          break;
        default:
          break;
      }
    }

    // Update total fee
    totalfee -= categoryDiscount;
    totalfee -= scholarshipDiscount;

    // Create student object
    const student = new Student({
      ...req.body,
      actualfee: 70000,
      totalfee,
      remaining: totalfee,
    });

    // Save student to database
    await student.save();

    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/:prn", async (req, res) => {
  try {
    const student = await Student.findOne({ prn: req.params.prn });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.put("/:prn", async (req, res) => {
  try {
    const { category, scholarships } = req.body;

    const student = await Student.findOne({ prn: req.params.prn });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    let totalfee = 70000;

    let categoryDiscount = 0;
    switch (category) {
      case "obc":
        categoryDiscount = 40000;
        break;
      case "sc":
        categoryDiscount = 45000;
        break;
      case "nt":
        categoryDiscount = 47000;
        break;
      default:
        break;
    }

    let scholarshipDiscount = 0;
    for (let scholarship of scholarships) {
      switch (scholarship) {
        case "ebc":
          scholarshipDiscount += 35000;
          break;
        case "obc1":
          scholarshipDiscount += 10000;
          break;
        case "obc2":
          scholarshipDiscount += 12000;
          break;
        case "sc1":
          scholarshipDiscount += 3000;
          break;
        case "sc2":
          scholarshipDiscount += 5000;
          break;
        case "nt1":
          scholarshipDiscount += 2000;
          break;
        case "nt2":
          scholarshipDiscount += 2500;
          break;
        default:
          break;
      }
    }

    totalfee -= categoryDiscount;
    totalfee -= scholarshipDiscount;

    student.set({
      ...req.body,
      totalfee,
      remaining: totalfee,
    });

    await student.save();

    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.delete("/:prn", async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ prn: req.params.prn });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Start Express Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
