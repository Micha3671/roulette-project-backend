output "vpc_id" {
  description = "The ID of the VPC"
  value       = aws_vpc.casino_vpc.id
}

output "subnet_id1" {
  description = "The public subnet ID of the VPC"
  value       = aws_subnet.public_1.id
}

output "subnet_id2" {
  description = "The public subnet ID of the VPC"
  value       = aws_subnet.public_2.id
}

output "subnet_id3" {
  description = "The public subnet ID of the VPC"
  value       = aws_subnet.public_3.id
}