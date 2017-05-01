const agent = require('superagent');
const async = require('async');
const shelljs = require('shelljs');
const jenkins = process.env.jenkins;


function backupJobConfig( job ) {
	console.log(`backup config of job [ ${job.name} ] `);
	shelljs.exec(`mkdir ${job.name}`, {silent: true});
	shelljs.exec(`curl ${jenkins}/job/${job.name}/config.xml > ${job.name}/config.xml`, {silent: true});
}

function done(err) {
	if (err) {
		throw new Error();
	}

}

agent.get(`${jenkins}/api/json`)
	.end((err, res) => {
		if(err)
			throw new Error();
		const jobs = res.body.jobs;
		async.map(jobs, backupJobConfig, done);		 
	}
);

