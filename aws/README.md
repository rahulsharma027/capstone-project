# AWS Deployment Guide

## Prerequisites
- AWS CLI installed and configured
- Docker installed
- AWS account with appropriate permissions
- Git and GitHub repository

## Deployment Steps

### 1. Configure AWS Credentials
```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Enter your default region (e.g., us-east-1)
```

### 2. Deploy Infrastructure
```bash
cd aws
chmod +x deploy.sh
./deploy.sh
```

### 3. Manual Steps (if needed)

#### Create RDS Database
The CloudFormation template automatically creates an RDS MySQL instance. Connection details:
- Endpoint: Available in CloudFormation outputs
- Username: admin
- Password: Stored in AWS Secrets Manager

#### Configure Environment Variables
Update backend application.properties with RDS endpoint:
```properties
spring.datasource.url=jdbc:mysql://<RDS_ENDPOINT>:3306/movie_booking_db
spring.datasource.username=admin
spring.datasource.password=<SECRET_FROM_SECRETS_MANAGER>
```

#### Set Up ECS Services

1. **Backend Service**
```bash
aws ecs create-service \
    --cluster production-movie-booking-cluster \
    --service-name backend-service \
    --task-definition backend-task \
    --desired-count 2 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}"
```

2. **Frontend Service**
```bash
aws ecs create-service \
    --cluster production-movie-booking-cluster \
    --service-name frontend-service \
    --task-definition frontend-task \
    --desired-count 2 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}"
```

### 4. Configure Domain (Optional)
- Set up Route 53 hosted zone
- Create A record pointing to Application Load Balancer
- Configure SSL/TLS certificate using AWS Certificate Manager

### 5. Set Up CI/CD with Jenkins

#### Configure Jenkins Credentials
1. AWS credentials for deployment
2. Docker Hub credentials
3. GitHub credentials

#### Configure Jenkins Pipeline
1. Create new Pipeline job
2. Point to Jenkinsfile in repository
3. Configure webhooks for automatic builds

## Monitoring and Maintenance

### CloudWatch Logs
Monitor application logs in CloudWatch:
```bash
aws logs tail /ecs/backend-service --follow
aws logs tail /ecs/frontend-service --follow
```

### Auto Scaling
Configure ECS service auto-scaling:
```bash
aws application-autoscaling register-scalable-target \
    --service-namespace ecs \
    --scalable-dimension ecs:service:DesiredCount \
    --resource-id service/production-movie-booking-cluster/backend-service \
    --min-capacity 2 \
    --max-capacity 10
```

### Database Backups
RDS automated backups are configured with 7-day retention period.

## Cost Optimization
- Use t3.micro for RDS in development
- Configure ECS service to scale down during off-peak hours
- Use S3 for static assets
- Enable CloudFront CDN for better performance

## Troubleshooting

### Check ECS Task Status
```bash
aws ecs describe-tasks --cluster production-movie-booking-cluster --tasks <task-id>
```

### Check ALB Health Checks
```bash
aws elbv2 describe-target-health --target-group-arn <target-group-arn>
```

### Access RDS
```bash
mysql -h <rds-endpoint> -u admin -p
```

## Cleanup
To delete all resources:
```bash
aws cloudformation delete-stack --stack-name production-movie-booking-stack
```
