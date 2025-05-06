import { Brain, Code, Database, Server, Cpu, Network, Icon } from "lucide-react"

import * as adobeXd from '/public/skills/adobe-xd.svg';
import adobeaudition from '/public/skills/adobeaudition.svg';
import afterEffects from '/public/skills/after-effects.svg';
import angular from '/public/skills/angular.svg';
import aws from '/public/skills/aws.svg';
import azure from '/public/skills/azure.svg';
import blender from '/public/skills/blender.svg';
import bootstrap from '/public/skills/bootstrap.svg';
import bulma from '/public/skills/bulma.svg';
import c from '/public/skills/c.svg';
import canva from '/public/skills/canva.svg';
import capacitorjs from '/public/skills/capacitorjs.svg';
import coffeescript from '/public/skills/coffeescript.svg';
import cplusplus from '/public/skills/cplusplus.svg';
import csharp from '/public/skills/csharp.svg';
import css from '/public/skills/css.svg';
import dart from '/public/skills/dart.svg';
import deno from '/public/skills/deno.svg';
import django from '/public/skills/django.svg';
import docker from '/public/skills/docker.svg';
import fastify from '/public/skills/fastify.svg';
import figma from '/public/skills/figma.svg';
import firebase from '/public/skills/firebase.svg';
import flutter from '/public/skills/flutter.svg';
import gcp from '/public/skills/gcp.svg';
import gimp from '/public/skills/gimp.svg';
import git from '/public/skills/git.svg';
import go from '/public/skills/go.svg';
import graphql from '/public/skills/graphql.svg';
import haxe from '/public/skills/haxe.svg';
import html from '/public/skills/html.svg';
import illustrator from '/public/skills/illustrator.svg';
import ionic from '/public/skills/ionic.svg';
import java from '/public/skills/java.svg';
import javascript from '/public/skills/javascript.svg';
import julia from '/public/skills/julia.svg';
import kotlin from '/public/skills/kotlin.svg';
import lightroom from '/public/skills/lightroom.svg';
import markdown from '/public/skills/markdown.svg';
import materialui from '/public/skills/materialui.svg';
import matlab from '/public/skills/matlab.svg';
import memsql from '/public/skills/memsql.svg';
import microsoftoffice from '/public/skills/microsoftoffice.svg';
import mongoDB from '/public/skills/mongoDB.svg';
import mysql from '/public/skills/mysql.svg';
import nextJS from '/public/skills/nextJS.svg';
import nginx from '/public/skills/nginx.svg';
import numpy from '/public/skills/numpy.svg';
import nuxtJS from '/public/skills/nuxtJS.svg';
import opencv from '/public/skills/opencv.svg';
import photoshop from '/public/skills/photoshop.svg';
import php from '/public/skills/php.svg';
import picsart from '/public/skills/picsart.svg';
import postgresql from '/public/skills/postgresql.svg';
import premierepro from '/public/skills/premierepro.svg';
import python from '/public/skills/python.svg';
import pytorch from '/public/skills/pytorch.svg';
import react from '/public/skills/react.svg';
import ruby from '/public/skills/ruby.svg';
import selenium from '/public/skills/selenium.svg';
import sketch from '/public/skills/sketch.svg';
import strapi from '/public/skills/strapi.svg';
import svelte from '/public/skills/svelte.svg';
import swift from '/public/skills/swift.svg';
import tailwind from '/public/skills/tailwind.svg';
import tensorflow from '/public/skills/tensorflow.svg';
import typescript from '/public/skills/typescript.svg';
import unity from '/public/skills/unity.svg';
import vitejs from '/public/skills/vitejs.svg';
import vue from '/public/skills/vue.svg';
import vuetifyjs from '/public/skills/vuetifyjs.svg';
import webix from '/public/skills/webix.svg';
import wolframalpha from '/public/skills/wolframalpha.svg';
import wordpress from '/public/skills/wordpress.svg';

export default [
    {
      id: "programming",
      title: "Programming",
      icon: <Code size={24} />,
      skills: [
        { name: "Python", level: 95, icon: python },
        { name: "TensorFlow", level: 90, icon: tensorflow },
        { name: "PyTorch", level: 85, icon: pytorch },
        { name: "SQL", level: 80, icon: mysql },
        { name: "Bash", level: 75 },
        { name: "JavaScript", level: 70, icon: javascript },
      ],
    },
    {
      id: "ml",
      title: "Machine Learning & Deep Learning",
      icon: <Brain size={24} />,
      skills: [
        { name: "CNNs", level: 90 },
        { name: "RNNs", level: 85 },
        { name: "Transformers", level: 90 },
        { name: "AutoML", level: 80 },
        { name: "Reinforcement Learning", level: 75 },
        { name: "GANs", level: 85 },
      ],
    },
    {
      id: "mlops",
      title: "MLOps & DevOps",
      icon: <Server size={24} />,
      skills: [
        { name: "Docker", level: 85 },
        { name: "Kubernetes", level: 80 },
        { name: "AWS", level: 85 },
        { name: "CI/CD Pipelines", level: 80 },
        { name: "Model Monitoring", level: 75 },
        { name: "MLflow", level: 85 },
      ],
    },
    {
      id: "genai",
      title: "Generative AI & LLMs",
      icon: <Cpu size={24} />,
      skills: [
        { name: "GPT-4", level: 90 },
        { name: "BERT", level: 85 },
        { name: "Stable Diffusion", level: 80 },
        { name: "OpenAI Whisper", level: 75 },
        { name: "LLM Fine-tuning", level: 85 },
        { name: "Prompt Engineering", level: 95 },
      ],
    },
    {
      id: "data",
      title: "Data Engineering & Analytics",
      icon: <Database size={24} />,
      skills: [
        { name: "Pandas", level: 90 },
        { name: "Spark", level: 80 },
        { name: "Hadoop", level: 75 },
        { name: "Data Visualization", level: 85 },
        { name: "ETL Pipelines", level: 80 },
        { name: "Feature Engineering", level: 90 },
      ],
    },
    {
      id: "research",
      title: "Research & Innovation",
      icon: <Network size={24} />,
      skills: [
        { name: "Paper Implementation", level: 85 },
        { name: "Research Methodology", level: 80 },
        { name: "Experimental Design", level: 85 },
        { name: "Literature Review", level: 90 },
        { name: "Hypothesis Testing", level: 80 },
        { name: "Technical Writing", level: 85 },
      ],
    },
  ]