const agent = require('superagent');
const shelljs = require('shelljs');

const jenkins = process.env.jenkins;

const backup_dir = 'jenkins_jobs_config_backup';


function backupJobConfig( job ) {
	console.log(`backup config of job --> ${job.name} `);
	shelljs.exec(`mkdir -p ${backup_dir}/${job.name}`, {silent: true});
	shelljs.exec(`curl ${jenkins}/job/${job.name}/config.xml > ${backup_dir}/${job.name}/config.xml`, {silent: true});
}


agent.get(`${jenkins}/api/json`)
	.end((err, res) => {
		if(err)
			throw new Error();

		res.body.jobs.forEach(backupJobConfig);
	}
);

