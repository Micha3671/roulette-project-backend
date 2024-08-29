resource "aws_subnet" "public_1" {
  vpc_id                  = aws_vpc.casino_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "eu-central-1a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "private_1" {
  vpc_id            = aws_vpc.casino_vpc.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "eu-central-1a"
}

resource "aws_subnet" "public_2" {
  vpc_id                  = aws_vpc.casino_vpc.id
  cidr_block              = "10.0.3.0/24"
  availability_zone       = "eu-central-1b"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "private_2" {
  vpc_id            = aws_vpc.casino_vpc.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "eu-central-1b"
}

resource "aws_subnet" "public_3" {
  vpc_id                  = aws_vpc.casino_vpc.id
  cidr_block              = "10.0.5.0/24"
  availability_zone       = "eu-central-1c"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "private_3" {
  vpc_id            = aws_vpc.casino_vpc.id
  cidr_block        = "10.0.6.0/24"
  availability_zone = "eu-central-1c"
}