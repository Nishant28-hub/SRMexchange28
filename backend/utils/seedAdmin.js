import User from "../models/User.js";

export const seedAdmin = async () => {
  try {
    const adminEmail = "nb0920@srmist.edu.in";
    const adminData = {
      name: "Nishanta Behera",
      email: adminEmail.toLowerCase(),
      password: "Nishantx123",
      college: "SRMIST",
      branch: "BME",
      year: "1",
      role: "admin",
      isVerified: true,
      reputation: 100,
      badges: ["Admin", "SRM Verified", "Campus Founder"],
    };

    let user = await User.findOne({ email: adminEmail.toLowerCase() }).select("+password");

    if (!user) {
      await User.create(adminData);
      console.log(`✅ Admin account seeded: ${adminEmail}`);
    } else {
      user.name = adminData.name;
      user.password = adminData.password;
      user.college = adminData.college;
      user.branch = adminData.branch;
      user.year = adminData.year;
      user.role = "admin";
      user.isVerified = true;
      if (!user.badges.includes("Admin")) user.badges.push("Admin");
      await user.save();
      console.log(`✅ Admin account updated and ready: ${adminEmail}`);
    }
  } catch (error) {
    console.error(`Error seeding admin: ${error.message}`);
  }
};
