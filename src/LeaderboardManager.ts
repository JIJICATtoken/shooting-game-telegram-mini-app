class LeaderboardManager {
    constructor() {
        // Initialize Supabase client
        this.supabaseUrl = 'YOUR_SUPABASE_URL';
        this.supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
        this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    }

    async updateScore(userId, score) {
        // Update the score for the user in the database
        const { data, error } = await this.supabase
            .from('leaderboard')
            .upsert({ user_id: userId, score: score });

        if (error) {
            console.error('Error updating score:', error);
        } else {
            console.log('Score updated for user:', userId);
            this.syncLeaderboard();
        }
    }

    async syncLeaderboard() {
        // Fetch the updated leaderboard from the database
        const { data, error } = await this.supabase
            .from('leaderboard')
            .select('*')
            .order('score', { ascending: false });

        if (error) {
            console.error('Error syncing leaderboard:', error);
        } else {
            console.log('Leaderboard synced:', data);
            this.displayLeaderboard(data);
        }
    }

    displayLeaderboard(leaderboard) {
        // Display the leaderboard in the application
        console.log('Current Leaderboard:');
        leaderboard.forEach(entry => {
            console.log(`User: ${entry.user_id}, Score: ${entry.score}`);
        });
    }
}

export default LeaderboardManager;

// Example usage:
// const manager = new LeaderboardManager();
// manager.updateScore('user123', 150);
