export class UserRepository {
    constructor(database) {
        this.db = database;
    }

    async emailExists(email) {
    try {
        const query = 'SELECT EXISTS(SELECT 1 FROM users WHERE email = $1) as exists';
        const result = await this.db.query(query, [email]);
        return result.rows[0].exists;
    } catch (error) {
        console.error('Error checking email existence:', error.message);
        throw new Error(`Error checking email: ${error.message}`);
    }
  }

  async create(user) {
    try {
      const query = `
        INSERT INTO users (
          user_id_from_request, gender, email, username, password, birth_date, age, address, cellphone, name
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING id, email;
      `;
      const params = [
        user.user_id_from_request,
        user.gender,
        user.email,
        user.username,
        user.password,
        user.birth_date,
        user.age,
        user.address,
        user.cellphone,
        user.name
      ];

      const result = await this.db.query(query, params);
      return { id: result.rows[0].id, email: result.rows[0].email };

    } catch (error) {
      console.error(`Error creating user ${user.name || ''}:`, error.message);
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async update(user) {
    try {
      const query = `
        UPDATE users 
        SET (user_id_from_request, gender, email, username, password, birth_date, age, address, cellphone, name, updated_at) 
          = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP)
        WHERE email = $3
        RETURNING id, email, created_at;
      `;
      const params = [
        user.user_id_from_request,
        user.gender,
        user.email,
        user.username,
        user.password,
        user.birth_date,
        user.age,
        user.address,
        user.cellphone,
        user.name
      ];

      const result = await this.db.query(query, params);
      if (result.rowCount === 0) {
        throw new Error('User not found for update');
      }
      return { id: result.rows[0].id, email: result.rows[0].email };

    } catch (error) {
      console.error(`Error updating user ${user.name || ''}:`, error.message);
      throw new Error(`Error updating user: ${error.message}`);
    }
  }
}