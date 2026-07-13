provider "aws" {
  region = "eu-north-1"
}

resource "aws_instance" "ec2-server" {
  ami                    = "ami-01ef747f983799d6f"
  instance_type          = "t3.micro"
  key_name               = "keypair"
  vpc_security_group_ids = [aws_security_group.sg.id]
  subnet_id              = aws_subnet.subnet.id
  tags = {
    Name = "My web Server"
  }
}

resource "aws_security_group" "sg" {
  name        = "sg"
  description = "Allowing SSH"
  vpc_id      = aws_vpc.app-vpc.id

  ingress {
    description = "SSH access"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP access"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS access"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name = "ssh-prot"
  }

}


resource "aws_vpc" "app-vpc" {
  cidr_block = "10.1.0.0/16"
  tags = {
    Name = "app-vpc"
  }

}

resource "aws_subnet" "subnet" {
  vpc_id                  = aws_vpc.app-vpc.id
  cidr_block              = "10.1.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "eu-north-1a"
  tags = {
    Name = "subnet"
  }
}


resource "aws_internet_gateway" "app-gtw" {
  vpc_id = aws_vpc.app-vpc.id
  tags = {
    Name = "app-gtw"
  }
}
resource "aws_route_table" "aws_rt" {
  vpc_id = aws_vpc.app-vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.app-gtw.id
  }
}

resource "aws_route_table_association" "app-public-subnet" {
  subnet_id      = aws_subnet.subnet.id
  route_table_id = aws_route_table.aws_rt.id
}

