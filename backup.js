const agent = require('superagent');
const async = require('async');
const shelljs = require('shelljs');

function backupJobConfig( job ) {
	shelljs.mkdir(job.name);
	shelljs.exec(`curl localhost:8088/job/${job.name}/config.xml | tee  ${job.name}/config.xml`);
}

function done(err) {
	if (err) {
		throw new Error();
	}

}

agent.get('localhost:8088/api/json?pretty=true')
	.end((err, res) => {
		if(err)
			throw new Error();
		const jobs = res.body.jobs;
		console.log(JSON.stringify(jobs, null, 2));
		async.map(jobs, backupJobConfig, done);		 
	}
);

