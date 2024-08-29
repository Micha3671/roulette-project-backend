resource "aws_route_table_association" "public_subnet1" {
  route_table_id = aws_route_table.public.id
  subnet_id      = aws_subnet.public_1.id
}

resource "aws_route_table_association" "public_subnet2" {
  route_table_id = aws_route_table.public.id
  subnet_id      = aws_subnet.public_2.id
}

resource "aws_route_table_association" "public_subnet3" {
  route_table_id = aws_route_table.public.id
  subnet_id      = aws_subnet.public_3.id
}