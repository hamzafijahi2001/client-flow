provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "ec2-server" {
  ami                    = "ami-0b6c6ebed2801a5cb"
  instance_type          = "t3.micro"
  key_name               = "server_key"
  vpc_security_group_ids = [aws_security_group.sg.id]
  subnet_id              = aws_subnet.subnet-01.id
  for_each               = toset(["Jenkins-master", "build-slave", "ansible"])
  tags = {
    Name = "${each.key}"
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
    description = "Jenkins access"
    from_port   = 8080
    to_port     = 8080
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

resource "aws_subnet" "subnet-01" {
  vpc_id                  = aws_vpc.app-vpc.id
  cidr_block              = "10.1.1.0/24"
  map_public_ip_on_launch = "true"
  availability_zone       = "us-east-1a"
  tags = {
    Name = "subnet-01"
  }
}

resource "aws_subnet" "subnet-02" {
  vpc_id                  = aws_vpc.app-vpc.id
  cidr_block              = "10.1.2.0/24"
  map_public_ip_on_launch = "true"
  availability_zone       = "us-east-1b"
  tags = {
    Name = "subnet-02"
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

resource "aws_route_table_association" "app-public-subnet-01" {
  subnet_id      = aws_subnet.subnet-01.id
  route_table_id = aws_route_table.aws_rt.id
}

resource "aws_route_table_association" "app-public-subnet-02" {
  subnet_id      = aws_subnet.subnet-02.id
  route_table_id = aws_route_table.aws_rt.id
}

/*module "sgs"{
  source = "./sgs"
  vpc_id = aws_vpc.app-vpc.id
}

module "eks" {
  source = "./eks"
  vpc_id = aws_vpc.app-vpc.id
  subnet_ids = [aws_subnet.subnet-01.id,aws_subnet.subnet-02.id]
  sg_ids = module.sgs.security_group_public
}*/