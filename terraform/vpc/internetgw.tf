resource "aws_internet_gateway" "casino_gateway" {
  vpc_id = aws_vpc.casino_vpc.id
}