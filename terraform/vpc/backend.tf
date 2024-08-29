terraform {
  backend "s3" {
    bucket = "casino-terraform-bucket"
    key    = "ec2-casino/vpc.tfstate"
    region = "eu-central-1"
  }
}