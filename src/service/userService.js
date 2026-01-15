import { UserRepository } from "../repository/userRepository.js";
import { client } from "../database/db.js";
import { Report } from "../reports/report.js";
import { hashPassword } from "../utils/encryption.js";


const userRepository = new UserRepository(client);

export async function getRandomUsers() {
    const response = await fetch("https://randomuser.me/api/?results=150");
    const result = await response.json();
    const report = new Report();

    for (let index = 0; index < result.results.length; index++) {
        const email = result.results[index].email;        
        const userData = result.results[index]

        if (userData.dob.age < 18) {
            console.log(`User ${email} ignored: under 18 years old (age: ${userData.dob.age})`);
            report.ignored++;
            continue; 
        }

        const hashedPassword = await hashPassword(userData.login.password);

        const user = {
            user_id_from_request: userData.login.uuid,
            gender: userData.gender,
            email: userData.email,
            username: userData.login.username,
            password: hashedPassword,
            birth_date: userData.dob.date,
            age: userData.dob.age,
            address: `${userData.location.street.number} ${userData.location.street.name}, ${userData.location.city}, ${userData.location.state}, ${userData.location.country}`,
            cellphone: userData.cell,
            name: `${userData.name.first} ${userData.name.last}`
        };

        try {
            const emailExists = await userRepository.emailExists(email);
            console.log(`User email: ${email} - Exists: ${emailExists}`);
            if (emailExists) {
                await userRepository.update(user);
                console.log(`User updated: ${email}`);
                report.updated++;
            } else {
                await userRepository.create(user);
                console.log(`User created: ${email}`);
                report.created++;
            }
        } catch (error) {
            console.log(`Error updating/creating user: ${error.message}`);
            report.errors++;
            report.errorDetails.push({ email, message: error.message });
        }
    }
    console.log(report.generate());
    
    const filename = await report.save();
    console.log(`Report saved in: ${filename}\n`);
    
    console.log('All users processed successfully!');
    return report;


}