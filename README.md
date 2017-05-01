# Jenkins Jobs Configuration Backup

## Usage
After clone repo 

```
$ npm install 
$ export jenkins=localhost:8088  # you may need to change 8088 to port you start jenkins at
$ node backup.js 
```

Output may like this
```
...
backup config of job --> job_name 
...
```

Finally, all jobs configuration were saved in `jenkins_jobs_config_backup` directory
