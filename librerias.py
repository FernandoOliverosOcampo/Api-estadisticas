from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
import supabase
import requests
import json
from datetime import datetime, timedelta
from supabase import create_client
