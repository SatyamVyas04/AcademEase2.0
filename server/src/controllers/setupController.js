import { User } from '../models/user.model.js';

export const setSetupData = async (req, res) => {
    const {
        name,
        email,
        phone,
        year,
        college,
        program,
        cgpa,
        academicInterests,
        goals
    } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        user.username = name;
        user.phoneNo = phone;
        user.passoutYear = year;
        user.college = college;
        user.program = program;
        user.cgpa = cgpa;
        user.academicInterests = academicInterests;
        user.goals = goals;

        // Save the updated user data
        await user.save();

        res.status(200).json({ message: 'User setup data updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user setup data', error });
    }
};
