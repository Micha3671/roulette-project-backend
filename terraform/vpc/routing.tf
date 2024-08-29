resource "aws_route_table" "public" {
  vpc_id = aws_vpc.casino_vpc.id

  # Route zum Internet Gateway
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.casino_gateway.id
  }

  tags = {
    Name = "public-route"
  }
}