const agent = require('superagent');
const async = require('async');
const shelljs = require('shelljs');
const jenkins = process.env.jenkins;

function backupJobConfig( job ) {
	shelljs.mkdir(job.name);
	shelljs.exec(`curl ${jenkins}/job/${job.name}/config.xml > ${job.name}/config.xml`, {silent: true});
}

function done(err) {
	if (err) {
		throw new Error();
	}

}

agent.get(`${jenkins}/api/json?pretty=true`)
	.end((err, res) => {
		if(err)
			throw new Error();
		const jobs = res.body.jobs;
		console.log(JSON.stringify(jobs, null, 2));
		async.map(jobs, backupJobConfig, done);		 
	}
);

