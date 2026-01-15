import fs from 'fs/promises';

export class Report {
    constructor() {
        this.created = 0;
        this.updated = 0;
        this.ignored = 0;
        this.errors = 0;
        this.errorDetails = [];
    }

    generate() {
        const total = this.created + this.updated + this.ignored + this.errors;
        
        let text = '\n=== PROCESSING REPORT ===\n\n';
        text += `Total processed: ${total}\n`;
        text += `Created: ${this.created}\n`;
        text += `Updated: ${this.updated}\n`;
        text += `Ignored: ${this.ignored}\n`;
        text += `Errors: ${this.errors}\n`;
        
        if (this.errorDetails.length > 0) {
            text += '\n--- DETAILS OF THE ERRORS ---\n';
            this.errorDetails.forEach((err, i) => {
                text += `${i + 1}. ${err.email}: ${err.message}\n`;
            });
        }
        
        text += '\n==================================\n';
        return text;
    }

    async save() {
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const filename = `reportsFile/report_${timestamp}.txt`;
        
        await fs.mkdir('reportsFile', { recursive: true });
        await fs.writeFile(filename, this.generate());
        
        return filename;
    }
}