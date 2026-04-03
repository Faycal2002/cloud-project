#!/usr/bin/env python3
"""
Generate a secure password hash using PBKDF2-HMAC-SHA256.

Output format:
    pbkdf2_sha256$<iterations>$<salt_hex>$<hash_hex>

Usage examples:
    python generate_password_hash.py
    python generate_password_hash.py --password "MyNewPassword123!"
    python generate_password_hash.py --iterations 200000
"""

from __future__ import annotations

import argparse
import getpass
import hashlib
import secrets


DEFAULT_ITERATIONS = 260_000
SALT_BYTES = 16


def hash_password(password: str, iterations: int = DEFAULT_ITERATIONS) -> str:
    salt = secrets.token_bytes(SALT_BYTES)
    digest = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt,
        iterations,
    )
    return f"pbkdf2_sha256${iterations}${salt.hex()}${digest.hex()}"


def main() -> None:
    parser = argparse.ArgumentParser(description="Create a secure password hash")
    parser.add_argument("--password", help="Password to hash (if omitted, prompt securely)")
    parser.add_argument(
        "--iterations",
        type=int,
        default=DEFAULT_ITERATIONS,
        help=f"PBKDF2 iterations (default: {DEFAULT_ITERATIONS})",
    )
    args = parser.parse_args()

    if args.iterations <= 0:
        raise ValueError("--iterations must be > 0")

    password = args.password
    if not password:
        password = getpass.getpass("Enter new password: ")
        confirm = getpass.getpass("Confirm password: ")
        if password != confirm:
            raise ValueError("Passwords do not match")

    if not password:
        raise ValueError("Password cannot be empty")

    print(hash_password(password, args.iterations))


if __name__ == "__main__":
    main()
